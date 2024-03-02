import { format } from 'date-fns';

export const formatDate = (date) => {
  if (!date) {
    return format(new Date(), 'dd MMM, yyyy');
  }
  return format(new Date(date), 'dd MMM, yyyy');
}
