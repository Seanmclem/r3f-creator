# React Three Fiber (r3f) Model Creator

The goal of this project is to build a visual editor to simplify creating models and shapes for React Three Fiber. You would be able to use a visual editor to add primitives to your model component, and configure their props with a GUI. You could see changes previewed in real-time. Then, when you're ready to export, we will use the File system access API in chromium to save our files. Or maybe simple download fallbacks too.

One day, I'd like it to be more of a Unity-like experience for R3F and the web.

Project is currently in infancy. Check `to-do.md` for basic status and updates. Like and subscribe :P

In the project directory, you can run:

`yarn start` or `npm run start`

### To-doing

- [x] Selected Sidebar components
- [x] Modularize code for updating nodes to separate utils file
- [x] Move actual trigger of node update to secondary-sidebar prop-listing
- [ ] Make props manually editable, instead of just changing color onClick
