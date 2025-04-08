import { Subject } from 'rxjs';

// Subject để publish các sự kiện thay đổi
export const dbChangeSubject = new Subject<{
  event: string;
  data: Record<string, any>;
}>();
