import { object, string } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

export const formSchema = toTypedSchema(
  object({
    email: string().email('Invalid email format').required('Email is required'),
    password: string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
    name: string(),
  }),
)
