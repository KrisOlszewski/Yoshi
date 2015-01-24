# Yoshi
---

[Live Demo](http://www.kolszewski.com/yoshi/)

---

## Options

[Velocity UI transitions](http://julian.com/research/velocity/#uiPack)

```javascript
Yoshi.init({
  container     : 'body', // DOM element where sections will be prepended
  withBang      : true, // '#' vs '#!' for SEO purposes
  pageExt       : '.html', // File extension for views via Ajax
  transitionIn  : 'transition.slideDownBigIn', // Velocity UI in transition
  transitionOut : 'transition.slideUpBigOut', // Velocity UI out transition
  defaultView   : 'welcome', // Default file view name
  missingView   : 'not-found', // Missing file view name
  activeNav     : 'is-active' // Navigation active UI state
});
```
