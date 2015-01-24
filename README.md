# Yoshi
---

[Live Demo](http://www.kolszewski.com/yoshi/)

---

## Options

[Velocity UI transitions](http://julian.com/research/velocity/#uiPack)

```javascript
Yoshi.init({
  container     : 'body', // DOM element whene sections will be prepended
  withBang      : true, // '#' vs '#!' for SEO purposes
  pageExt       : '.html', // Extension of files requested via Ajax
  transitionIn  : 'transition.slideDownBigIn', // Velocity UI transition
  transitionOut : 'transition.slideUpBigOut', // Velocity UI transition
  defaultView   : 'welcome', // Default file view name
  missingView   : 'not-found', // Missing file view name
  activeNav     : 'is-active' // Navigation active UI state
});
```
