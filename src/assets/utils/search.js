import { toSnakeCase } from "./strings";

export function searchQueryToSearch(
  searchQuery,
  textFields = [],
  keywordsFields = []
) {
  const conds = [];
  keywordsFields.forEach(field => {
    if (searchQuery[field]) {
      conds.push(searchQueryKeywordToSearch(field, searchQuery[field]));
    }
  });
  /* if (searchQuery.status) {
    conds.push(searchQueryKeywordToSearch("status", searchQuery.status));
  } else if (searchQuery.type) {
    conds.push(searchQueryKeywordToSearch("type", searchQuery.type));
  } else if (searchQuery.difficulty) {
    conds.push(
      searchQueryKeywordToSearch("difficulty", searchQuery.difficulty)
    );
  } else if (searchQuery.module) {
    conds.push(searchQueryKeywordToSearch("module", searchQuery.module));
  } else if (searchQuery.event) {
    conds.push(searchQueryKeywordToSearch("event", searchQuery.event));
  } else if (searchQuery.platform) {
    conds.push(searchQueryKeywordToSearch("platform", searchQuery.event));
  } */
  if (searchQuery.text) {
    conds.push(searchQueryTextToSearch(searchQuery.text, textFields));
  }
  if (conds.length > 1) {
    return { $and: conds };
  } else if (conds.length === 1) {
    return conds[0];
  } else {
    return undefined;
  }
}

export function searchQueryTextToSearch(tokens, fields = []) {
  const $or = [];
  tokens.forEach(token => {
    fields.forEach(field => {
      $or.push({ [field]: { $contL: token } });
    });
  });
  return {
    $or
  };
}

export function searchQueryKeywordToSearch(name, value) {
  if (Array.isArray(value)) {
    const $or = [];
    value.forEach(v => {
      $or.push({ [name]: { $eq: toSnakeCase(v) } });
    });
    return $or;
  } else {
    return { [name]: { $eq: toSnakeCase(value) } };
  }
}
