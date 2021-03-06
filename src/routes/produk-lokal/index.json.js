import products, { getRandom } from './_products.js';
import { getDataFromFile } from '../../utilities/markdown';
import { promotions } from '../../utilities/promotion';
import { prioritizePromo, prioritizePhoto } from '../../utilities/sort';

const contents = JSON.stringify({
	products: [...products.values()],
	randomProducts: getRandom()
		.sort(prioritizePromo)
		.sort(prioritizePhoto)
		.slice(0, 4),
	productCategories: getDataFromFile('data/category-product.yml').categories,
	promotions
});

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}