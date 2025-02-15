export const getNewsIdFromUrl = () => {
  const pathname = window.location.pathname;
  const newsId = pathname.split('/')[-1];

  return newsId ? { newsFlashId: +newsId } : { pageNumber: 1 };
};
