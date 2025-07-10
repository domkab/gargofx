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
      action: PayloadAction<{ id: string; block: Partial<ContentBlock> }>
    ) => {
      const index = state.content.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.content[index] = { ...state.content[index], ...action.payload.block };
      }
    },

    removeContentBlock: (state, action: PayloadAction<string>) => {
      state.content = state.content.filter(block => block.id !== action.payload);
    },

    moveContentBlockUp: (state, action: PayloadAction<string>) => {
      const index = state.content.findIndex(block => block.id === action.payload);
      if (index > 0) {
        const temp = state.content[index];
        state.content[index] = state.content[index - 1];
        state.content[index - 1] = temp;
      }
    },

    moveContentBlockDown: (state, action: PayloadAction<string>) => {
      const index = state.content.findIndex(block => block.id === action.payload);
      if (index < state.content.length - 1 && index !== -1) {
        const temp = state.content[index];
        state.content[index] = state.content[index + 1];
        state.content[index + 1] = temp;
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
