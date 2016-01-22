# TicTacToeReact #

## Remake of my previous [TicTacToeJS](https://github.com/mjamado/TicTacToeJS) ##

![Marco Amado's Gravatar](http://1.gravatar.com/avatar/1a11649fa31edc86ddbfa4466ebf560b?s=40&d=http%3A%2F%2F1.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D40&r=G)  
[Marco Amado](mailto:mjamado@dreamsincode.com) @ [DreamsInCode](http://www.dreamsincode.com)

### Motivation ###

As a full-time full-stack developer with a lot on his plate, I've glossed over
the last couple years with no time to look into what was happening around the
front-end scene.

Sure, I've read a couple things, but I just didn't have the time to tinker
with all the new shiny stuff. Reading is good for you, but you'll learn
jack without getting your hands dirty.

So, what could I cobble together, away from yet another To Do app?
And what's with that particular example, anyway?

I had my TicTacToeJS laying around (and it has presentation problems - just
discovered that while working on this one), it looked like it could make a cool
adaptation: it had to maintain state, the interface was pretty straightforward,
it had lots of user interaction.

I tried to make this project also as much as a boilerplate as I could. For such
a simple little app, one could argue that half the stuff was uncalled for. Heck,
projects as simple as this one should be vanilla JS anyway. But on using everything
a *big* project needs, I learned a lot and I can always start big projects from
this sort of boilerplate.

I won't go over the TicTacToe part again. The AI of the game was slightly
adapted, but the theory is the same. Go read what I wrote in the original
project. 

### Technologies and stack ###

* **ES6** (or ECMAScript 2015, as some adamantly recommend)

  The new standard has so many cool stuff: constants, block scoped variables,
  arrow functions, default function parameters, spread operator, property
  shorthand, computed property names, modules, classes (although...), iterators
  and generators, array find, I don't know, I just drooled over all of this for
  more than a year.
  
  But, *alas*, couldn't use it on any browser anyway...

* **CSS Modules**
  
  I'll be honest, I only discovered this while doing this project but *OMG!*,
  this is awesome! Scoped CSS may be the most useful single feature in years for
  CSS. *'Nuff said*.

* **React and JSX**
  
  Because Facebook engineers couldn't get the notification feature straight (*true
  story, bro*), everyone jumped the bandwagon. And it's a magnificient bandwagon.
  After the initial impact of *what the hell is that damned HTML doing in my JS*,
  I came to embrace the encapsulation it gives you. After all, we've been doing the
  exact same thing, more or less abstracted, with PHP (looking at you, Smarty).

* **React Router**
  
  Because deep linking. I've been wary of single page applications for some years
  mostly because a lot are badly done. Keeping you at the same address, not giving
  you a link to bookmark or share, no sane browser back - it's just wrong. The
  decision to use a router was a no-brainer since the beginning.

* **Redux** (with Reselect and Redux Thunk)
  
  Another shiny new thing. State maintenance and managment done right. After
  Facebook's Flux, which is kind of convoluted for the uninitiated, Dan Abromov's
  Redux simplified the concept and threw an amazing documentation on top.

* **Normalize.css and React Toolbox**

  Because I suck at design. I *am* a full-stack developer, but just in the sense
  that I make stuff *work*. I can't, for the life of me, make them *pretty*.
  Material design components ready to use? Just my wheelhouse.

* **Babel**

  Because browser support sucks big time, transpiling is more than a convenience,
  it's a necessity. It makes all the amazing ES6 and JSX work in *ye olde* ES5.

* **SCSS** (with Compass mixins)

  I've used it before, can't live without it anymore. The fact that this stack
  automates the build and inclusion of the CSS files is just the icing on the cake.

* **Webpack**

  This little piece of amazing engineering just left me flabbergasted. I've had some
  encounters with other bundlers and task runners before, mostly Grunt and Gulp, but
  Webpack had me from the start. It's core brings a lot by default and it's loaders
  and plugins can achieve even more. It's dev server is also fantastic for local
  development. And, of course it also brings...
  
* **Hot Loading**

  Save the file, browser refreshes to reflect your recent changes. This is just
  *waaay* better than what I'm used to (and I even have to upload first, gladly right
  from my usual IDE, but still). And it maintains the app state, which is even
  better for us developers.

* **Redux DevTools**
  
  Having worked with Smarty and it's console for a few years now, I was used to have
  the ability to see the state of the app at the moment. Redux DevTools takes this even
  further: not only it shows what action happened and what's the state *now*, it also
  shows you all the past actions and states. You can go back to previous states, take
  away actions from the middle, always in real time. Awesome tool.
  
### Run the project ###

Clone the *repo* and run this on the same folder:

```bash
npm install
npm run watch
```

The first command will install all the dependencies on `package.json`, including
development dependencies (which you want to). The second will start webpack dev server
and serve everything from there. Just point a browser to localhost:8080.

If you inspect the network tab on your browser developer tools, you'll be in for a
shocker (I know I was!): the files needed to run this are enormous. But fear not, that's
just the development version. If you run this:

```bash
npm run deploy
```

You'll get a new folder `tmp` with only the necessary files, with much more sane filesizes.
You could even open `index.html` directly, and it would work - if not for some cross-origin
protection from the browser and it's History API, but I'll get to that problem some day.
Anyway, that problem won't be one as soon as the project gets deployed on some Node.js server
somewhere.