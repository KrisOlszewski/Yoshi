# Yoshi
Low-level single page app using URL hash and Ajax. Not MVC, but still cool.

+ Dependencies: [Velocity.js + UI Pack](http://julian.com/research/velocity/), [jQuery](http://jquery.com/), [jQuery Tiny Pub/Sub](https://github.com/cowboy/jquery-tiny-pubsub)
+ Support: IE8+
+ [Live Demo](http://www.kolszewski.com/yoshi/)

## Options

```javascript
Yoshi.init({
  container     : 'body', // Element selector where sections will be prepended
  withBang      : true, // '#' vs '#!' for SEO purposes
  pageExt       : '.html', // File extension for view files via Ajax
  transitionIn  : 'slideDownBigIn', // Velocity UI in transition
  transitionOut : 'slideUpBigOut', // Velocity UI out transition
  defaultView   : 'welcome', // Default file view name
  missingView   : 'not-found', // Missing file view name
  activeNav     : 'is-active', // Navigation active UI state
  onBeforeChange: function(view) {
    // old view, 'null' if undefined
  },
  onAfterChange: function(view) {
    // new view
  }
});
```

You can find all available transitions here: [Velocity.js UI Pack](http://julian.com/research/velocity/#uiPack)

## Navigation

`href` is used to trigger URL hash change, while `data-href` is used to set active UI state.

```html
<a href="#!view-name" data-href="view-name">View Name</a>
```

## View structure

HTML structure is completely up to you, as long as, you have `data-view` attribute set on main tag.

**With vertical centering**

Set `data-height` attribute on tag with `u-table` class to dynamically set `height` to window's height.

```html
<main class="c-section" data-view="view-name">
  <div class="u-table" data-height>
    <div class="u-table__cell">
      <div class="u-wrapper">
        <article class="c-article">
          <!-- Your content -->
        </article>
      </div>
    </div>
  </div>
</main>

```

**Without vertical centering**

```html
<main class="c-section" data-view="view-name">
  <div class="u-wrapper">
    <article class="c-article">
      <!-- Your content -->
    </article>
  </div>
</main>
```
