import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { FormData } from '@/types/FormData';
import { uploadPostImage } from '../thunks/postFormThunks';
import { postFormData } from '@/types/post/postFormNew';
import { ContentBlock } from '@/types/post/iPost';

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

    updateMainImageMeta: (state, action: PayloadAction<{ alt: string }>) => {
      state.heroImage.alt = action.payload.alt;
    },

    addContentBlock: (state, action: PayloadAction<ContentBlock>) => {
      state.content.push(action.payload);
    },

    updateContentBlock: (
      state,
      action: PayloadAction<{ index: number; block: Partial<ContentBlock> }>
    ) => {
      const { index, block } = action.payload;
      state.content[index] = { ...state.content[index], ...block };
    },

    removeContentBlock: (state, action: PayloadAction<number>) => {
      state.content.splice(action.payload, 1);
    },

    moveContentBlockUp: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      if (i > 0) {
        const temp = state.content[i];
        state.content[i] = state.content[i - 1];
        state.content[i - 1] = temp;
      }
    },

    moveContentBlockDown: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      if (i < state.content.length - 1) {
        const temp = state.content[i];
        state.content[i] = state.content[i + 1];
        state.content[i + 1] = temp;
      }
    },

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
  // updateInlineImageMeta,
  setFile,
  updateMainImageMeta,
  addContentBlock,
  updateContentBlock,
  removeContentBlock,
  moveContentBlockUp,
  moveContentBlockDown,
  setImageUploadProgress,
  setImageUploadError,
  resetForm,
} = postFormSlice.actions;

export default postFormSlice.reducer;
