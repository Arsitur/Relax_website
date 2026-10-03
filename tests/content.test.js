import { test } from 'node:test';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { readCart } from '../scripts/cart.js';
const menu = JSON.parse(readFileSync(new URL('../data/menu.json', import.meta.url)));
const articles = JSON.parse(readFileSync(new URL('../data/articles.json', import.meta.url)));
test('each of the ten categories has ten unique local products and valid local assets', () => {
    assert.equal(menu.length, 100);
    assert.equal(new Set(menu.map(item => item.id)).size, 100);
    assert.equal(new Set(menu.map(item => item.photoURL)).size, 100);
    const hashes = menu.map(item => createHash("sha256").update(readFileSync(new URL("../" + item.photoURL, import.meta.url))).digest("hex"));
    assert.equal(new Set(hashes).size, 100, "menu photographs must not repeat under different filenames");
    const counts = {};
    for (const item of menu) {
        counts[item.category] = (counts[item.category] || 0) + 1;
        assert(item.name && item.description);
        assert(Number.isFinite(item.price) && item.price >= 0);
        assert(Number.isFinite(item.masa) && item.masa > 0);
        assert(item.photoURL.startsWith('assets/'));
        assert(existsSync(new URL('../' + item.photoURL, import.meta.url)));
        assert(!item.reviews.length);
    }
    assert.equal(Object.keys(counts).length, 10);
    assert(Object.values(counts).every(count => count === 10));
});
test('articles keep blocks locally, images in their own folder, and ids agree with Firestore rules', () => {
    const rules = readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8');
    assert.equal(articles.length, 8);
    assert.equal(new Set(articles.map(item => item.id)).size, 8);
    for (const article of articles) {
        assert(rules.includes(`'${article.id}'`));
        assert(article.image.startsWith(`assets/Articles/${article.id}/`));
        assert(existsSync(new URL('../' + article.image, import.meta.url)));
        assert(article.blocks.length >= 6);
        assert(article.datePosted >= Date.UTC(2024,5,1) && article.datePosted < Date.UTC(2024,6,1));
        for (const block of article.blocks) assert(['heading','paragraph'].includes(block.type) && typeof block.text === 'string');
    }
});
test('malformed, removed and invalid basket items cannot break menu/checkout', () => {
    globalThis.localStorage = { getItem: () => 'broken JSON' };
    assert.deepEqual(readCart(menu), {});
    localStorage.getItem = () => JSON.stringify({ [menu[0].id]: 2, unknown: 4, [menu[1].id]: -3, [menu[2].id]: 1000 });
    assert.deepEqual(readCart(menu), { [menu[0].id]: 2 });
});
