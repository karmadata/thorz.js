// entrypoint for compiling into a browser includable package

const implicitFlow = require('./browsersrc/implicit-flow')

window.thorz = {
  implicitFlow: implicitFlow
}
