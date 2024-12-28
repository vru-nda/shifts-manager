import {
  Button,
  Drawer,
  TextField,
  Card,
  IconButton,
  MenuItem,
  Box,
} from '@mui/material';
import {Controller, useForm, useFieldArray} from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import Title from '../common/Title';

const SHIFT_TYPES = ['Consultation', 'Telephone', 'Ambulance'] as const;
type ShiftType = (typeof SHIFT_TYPES)[number];

interface ShiftFormData {
  title: string;
  description: string;
  shifts: {
    date: string;
    type: ShiftType;
    startTime: string;
    endTime: string;
    price: number;
  }[];
}

const ShiftDrawer = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ShiftFormData) => void;
  initialData: ShiftFormData;
}) => {
  const {control, handleSubmit, watch} = useForm<ShiftFormData>({
    defaultValues: initialData || {
      title: '',
      description: '',
      shifts: [
        {
          date: '',
          type: 'Consultation',
          startTime: '',
          endTime: '',
          price: 0,
        },
      ],
    },
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'shifts',
    rules: {minLength: 1, maxLength: 10},
  });

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <div style={{width: '500px', padding: '20px'}}>
        <Title title='Create/Edit' />
        <Box sx={{mt: 5}}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{display: 'flex', flexDirection: 'column', gap: '16px'}}
          >
            <Controller
              name='title'
              control={control}
              rules={{
                required: 'Title is required',
                maxLength: {
                  value: 100,
                  message: 'Title cannot exceed 100 characters',
                },
              }}
              render={({field, fieldState}) => (
                <TextField
                  {...field}
                  label='Title'
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name='description'
              control={control}
              rules={{
                maxLength: {
                  value: 500,
                  message: 'Description cannot exceed 500 characters',
                },
              }}
              render={({field, fieldState}) => (
                <TextField
                  {...field}
                  label='Description'
                  multiline
                  rows={2}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  fullWidth
                />
              )}
            />

            {fields.map((field, index) => (
              <Card key={field.id} sx={{p: 2, bgcolor: 'grey.100'}}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <Controller
                    name={`shifts.${index}.date`}
                    control={control}
                    rules={{required: 'Date is required'}}
                    render={({field, fieldState}) => (
                      <TextField
                        {...field}
                        type='date'
                        label='Date'
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        fullWidth
                        InputLabelProps={{shrink: true}}
                      />
                    )}
                  />
                  <IconButton
                    onClick={() => remove(index)}
                    color='error'
                    disabled={fields.length <= 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>

                <div
                  style={{display: 'flex', gap: '16px', marginBottom: '16px'}}
                >
                  <Controller
                    name={`shifts.${index}.startTime`}
                    control={control}
                    rules={{required: 'Start time is required'}}
                    render={({field, fieldState}) => (
                      <TextField
                        {...field}
                        type='time'
                        label='Start Time'
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name={`shifts.${index}.endTime`}
                    control={control}
                    rules={{
                      required: 'End time is required',
                      validate: (value) => {
                        const startTime = watch(`shifts.${index}.startTime`);
                        return (
                          !startTime ||
                          value > startTime ||
                          'End time must be after start time'
                        );
                      },
                    }}
                    render={({field, fieldState}) => (
                      <TextField
                        {...field}
                        type='time'
                        label='End Time'
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        fullWidth
                      />
                    )}
                  />
                </div>

                <div style={{display: 'flex', gap: '16px'}}>
                  <Controller
                    name={`shifts.${index}.type`}
                    control={control}
                    rules={{required: 'Type is required'}}
                    render={({field, fieldState}) => (
                      <TextField
                        {...field}
                        select
                        label='Type'
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        fullWidth
                      >
                        {SHIFT_TYPES.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                  <Controller
                    name={`shifts.${index}.price`}
                    control={control}
                    rules={{
                      required: 'Price is required',
                      min: {value: 0, message: 'Price cannot be negative'},
                    }}
                    render={({field, fieldState}) => (
                      <TextField
                        {...field}
                        type='number'
                        label='Price'
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        fullWidth
                      />
                    )}
                  />
                </div>
              </Card>
            ))}

            <Button
              type='button'
              variant='outlined'
              sx={{
                background: '#212529',
                color: 'white',
              }}
              onClick={() =>
                append({
                  date: '',
                  type: 'Consultation',
                  startTime: '',
                  endTime: '',
                  price: 0,
                })
              }
              disabled={fields.length >= 10}
            >
              Add Date
            </Button>

            <div style={{display: 'flex', gap: '16px', marginTop: '16px'}}>
              <Button
                sx={{
                  background: '#212529',
                  color: 'white',
                }}
                type='submit'
                variant='contained'
                size='large'
                fullWidth
              >
                Save
              </Button>
              <Button
                type='button'
                variant='outlined'
                color='error'
                size='large'
                fullWidth
                onClick={onClose}
              >
                Delete
              </Button>
            </div>
          </form>
        </Box>
      </div>
    </Drawer>
  );
};

export default ShiftDrawer;
