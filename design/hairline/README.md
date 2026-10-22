# Hairline figures

Source for the three interactive line figures in `public/hairline/`, made with the
`hairline-create` skill on the MIT-licensed `@lucasmarkes/hairline` kernel.

- `stack.js`: the product stack (layers pull apart; pick a layer)
- `sorter.js`: the pigeonhole rack (the slot under the pointer pulls its letter)
- `devices.js`: phone, tablet, monitor (the device under the pointer swings upright)

To change one: edit the `.js` here, then from this folder run
`node ~/.claude/skills/hairline-create/look.mjs <name>.js --answer x,y,z` until it exits 0,
and copy the built `hairline-<name>.html` to `public/hairline/<name>.html`.
Never edit the built HTML's kernel or bench by hand.
