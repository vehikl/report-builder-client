import { CellValue, Format } from '@src/definitions/Report.ts';

export const format = (value: CellValue, format: Format): CellValue => {
  switch (format) {
    case 'General':
      return value;
    case 'YesNo':
      if (value === 0 || value === 1) {
        return value === 0 ? 'No' : 'Yes';
      }
      return value;
    case 'NumberZeroDecimal': {
      if (typeof value !== 'number' && typeof value !== 'string') {
        return value;
      }

      if (typeof value === 'string' && value.trim() === '') {
        return value;
      }

      const numberValue = Number(value);

      if (Number.isNaN(numberValue)) {
        return value;
      }

      const f = new Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 1,
        maximumFractionDigits: 0,
      });

      return f.format(numberValue);
    }

    case 'NumberTwoDecimals': {
      if (typeof value !== 'number' && typeof value !== 'string') {
        return value;
      }

      if (typeof value === 'string' && value.trim() === '') {
        return value;
      }

      const numberValue = Number(value);

      if (Number.isNaN(numberValue)) {
        return value;
      }

      const f = new Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 1,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return f.format(numberValue);
    }
  }
};
