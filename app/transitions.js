export default function() {
  this.transition(
    this.hasClass('toDown-toUp'),
    this.toValue(true),
    this.use('toDown'),
    this.reverse('toUp')
  );
}
