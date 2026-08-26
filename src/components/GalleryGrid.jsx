import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { withBase } from '../utils/assetPath';
import Pagination from './Pagination';

const DESKTOP_IMAGES_PER_PAGE = 8;
const MOBILE_IMAGES_PER_PAGE = 6;

function getImagesPerPage() {
  return window.matchMedia?.('(max-width: 639px)').matches
    ? MOBILE_IMAGES_PER_PAGE
    : DESKTOP_IMAGES_PER_PAGE;
}

export default function GalleryGrid({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [imagesPerPage, setImagesPerPage] = useState(getImagesPerPage);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);

  const isOpen = activeIndex !== null;
  const active = isOpen ? items[activeIndex] : null;
  const pageCount = Math.ceil(items.length / imagesPerPage);
  const firstItemIndex = page * imagesPerPage;
  const pageItems = items.slice(firstItemIndex, firstItemIndex + imagesPerPage);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const updateImagesPerPage = () => setImagesPerPage(getImagesPerPage());
    mediaQuery.addEventListener('change', updateImagesPerPage);
    return () => mediaQuery.removeEventListener('change', updateImagesPerPage);
  }, []);

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, Math.max(pageCount - 1, 0)));
  }, [pageCount]);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (!isOpen) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') prev();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeIndex]);

  function open(index, triggerEl) {
    triggerRef.current = triggerEl;
    setActiveIndex(index);
  }
  function close() {
    setActiveIndex(null);
  }
  function next() {
    setActiveIndex((i) => (i + 1) % items.length);
  }
  function prev() {
    setActiveIndex((i) => (i - 1 + items.length) % items.length);
  }
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) close();
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {pageItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className="card overflow-hidden aspect-square focus-visible:outline focus-visible:outline-3"
            onClick={(event) => open(firstItemIndex + index, event.currentTarget)}
            aria-label={`Open image: ${item.title}`}
          >
            <img
              src={withBase(item.image)}
              alt={item.alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} label="gallery page" />

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            className="absolute top-4 right-4 text-white h-11 w-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Close image viewer"
          >
            <X size={24} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={prev}
            className="absolute left-2 sm:left-6 text-white h-11 w-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft size={26} aria-hidden="true" />
          </button>

          <figure className="max-w-3xl max-h-[80vh] flex flex-col items-center gap-3">
            <img
              src={withBase(active.image)}
              alt={active.alt}
              className="max-h-[70vh] object-contain rounded-lg"
            />
            <figcaption className="text-white text-sm">{active.title}</figcaption>
          </figure>

          <button
            type="button"
            onClick={next}
            className="absolute right-2 sm:right-6 text-white h-11 w-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight size={26} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
