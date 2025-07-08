import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { FormData } from '@/types/FormData';
import { uploadPostImage } from '../thunks/postFormThunks';
import { postFormData } from '@/types/post/postFormNew';

export interface PostFormState extends postFormData {
  fileUrl: string | null;
  imageUploadProgress: string | null;
  imageUploadError: string | null;
}

const initialState: PostFormState = {
  title: {
    bold: '',
    regular: ''
  },
  slug: '',
  heroImage: {
    url: '',
    alt: ''
  },
  description: '',
  content: [],
  credits: '',
  fileUrl: null,
  imageUploadProgress: null,
  imageUploadError: null
};

const postFormSlice = createSlice({
  name: 'postForm',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<PostFormState>>) => {
      return { ...state, ...action.payload };
    },
    // addInlineImage: (state, action: PayloadAction<ImageData>) => {
    //   state.images.inline.push(action.payload);
    // },
    // removeInlineImage: (
    //   state,
    //   action: PayloadAction<string>
    // ) => {
    //   state.images.inline =
    //     state.images.inline.filter(img => img.id !== action.payload);
    // },
    updateMainImageMeta: (state, action: PayloadAction<{ alt: string }>) => {
      state.heroImage.alt = action.payload.alt;
    },
    // updateInlineImageMeta: (
    //   state,
    //   action: PayloadAction<{ id: string; meta: ImageMeta }>
    // ) => {
    //   const img = state.images.inline.find(i => i.id === action.payload.id);
    //   if (img) {
    //     img.meta = { ...img.meta, ...action.payload.meta };
    //   }
    // },
    setFile: (state, action: PayloadAction<string | null>) => {
      state.fileUrl = action.payload;
    },
    setImageUploadProgress: (state, action: PayloadAction<string | null>) => {
      state.imageUploadProgress = action.payload;
    },
    setImageUploadError: (state, action: PayloadAction<string | null>) => {
      state.imageUploadError = action.payload;
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPostImage.pending, (state) => {
        state.imageUploadProgress = '0';
        state.imageUploadError = null;
      })
      .addCase(uploadPostImage.fulfilled, (state, action) => {
        if (action.payload.target === 'main') {
          state.heroImage.url = action.payload.url;
        }
        state.imageUploadProgress = null;
      })
      .addCase(uploadPostImage.rejected, (state) => {
        state.imageUploadProgress = null;
        state.imageUploadError = 'Upload failed';
      });
  },
});

export const {
  setFormData,
  // addInlineImage,
  // removeInlineImage,
  // updateMainImageMeta,
  // updateInlineImageMeta,
  setFile,
  setImageUploadProgress,
  setImageUploadError,
  resetForm,
} = postFormSlice.actions;

export default postFormSlice.reducer;