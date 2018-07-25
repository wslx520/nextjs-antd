# for issue reproduce

After `npm run dev`, browse `http://localhost:3333`, it works properly. 

But then go to the `other` page and come back, the styles in the main page lost (in this repository, it's `Carousel`).

We can check the `index.css` by DevTools to compare the contents between first-entered and come-back.