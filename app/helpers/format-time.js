import { helper } from '@ember/component/helper';

function formatNumber(num) {
  return num < 10 ? `0${num}` : num;
}

export default helper(function formatTime(params/*, hash*/) {
  if (!params[0]) {
    return '';
  }

  const dateTime = typeof(params[0]) === 'string' || params[0] instanceof String
    ? new Date(params[0])
    : params[0];

  return `${formatNumber(dateTime.getHours())}:${formatNumber(dateTime.getMinutes())}`;
});
