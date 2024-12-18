export const getNewsIdFromUrl = () => {
  const pathname = window.location.pathname;
  const [, , newsId] = pathname.split('/');

  return newsId ? { newsFlashId: +newsId } : { pageNumber: 1 };
};
