/* eslint-disable */

it('runs', function() {
  expect(true).to.be.true;
});

it('runs in the browser', function() {
  expect(window).to.exist;
  expect(document).to.exist;
});

it('applies color:blue to body', function() {
  var bodyColor = window.getComputedStyle(document.body).getPropertyValue('color');
  expect(bodyColor).to.equal('rgb(0, 0, 255)');
});
