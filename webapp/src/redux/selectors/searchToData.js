import 'url-search-params-polyfill';

export default ({ location }) => {
  const search = new URLSearchParams(location.search);

  return {
    section: search.get('section') || 'charts',
    tabId: parseInt(search.get('tabId'), 10) || 0,
    currentModel: search.get('model') || 'maxes',
  };
};
