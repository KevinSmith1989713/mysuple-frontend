/**
 * Paging Utility
 *
 * @since   2019-12-23
 * @author  shkim
 */

const COUNT_PER_PAGE = 10;

module.exports = {
	getPagingLimit(params) {
		let page = 1;
		if (params.body.paging && params.body.paging.page)
			page = params.body.paging.page;

		let countPerPage = COUNT_PER_PAGE;
		if (params.body.paging && params.body.paging.countPerPage)
			countPerPage = params.body.paging.countPerPage;

		let startRow = (page - 1) * countPerPage;
		let sql = ' LIMIT ' + startRow + ', ' + countPerPage;

		return sql;
	},
};
