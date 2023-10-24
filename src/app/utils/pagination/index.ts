/**
 * @function paginate
 * @param {number} currentPage page number to get
 * @param {number} count total number of items
 * @param {array} rows items
 * @param {number} pageLimit number of items per page/request
 * @returns {object} return the meta for pagination
 */
export const paginate = (
    currentPage: number,
    count: number,
    rows: Array<any>,
    pageLimit?: number,
  ): object => {
    const meta = {
      currentPage: Number(currentPage) || 1,
      pageCount: pageLimit ? Math.ceil(count / Number(pageLimit)) : 1,
      pageSize: rows.length,
      count,
    };
    return meta;
  };
  