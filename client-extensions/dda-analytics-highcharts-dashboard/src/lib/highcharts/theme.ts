import type Highcharts from 'highcharts';

export function applyHighchartsTheme(HighchartsNS: typeof Highcharts): void {
  HighchartsNS.setOptions({
    lang: {
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
    chart: {
      style: {
        fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, sans-serif',
      },
      animation: {
        duration: 700,
      },
    },
    credits: { enabled: false },
    tooltip: {
      backgroundColor: '#ffffff',
      borderWidth: 0,
      borderRadius: 8,
      style: {
        fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, sans-serif',
      },
    },
  });
}
