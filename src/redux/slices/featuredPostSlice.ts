import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeaturedBlock, FeaturedLayoutRow } from '@/types/featuredLayout';
// import { FeaturedPostType } from '@/types/Post';
// import { fetchFeaturedPosts, deleteFeaturedPost } from '../thunks/featuredPostThunks';

interface FeaturedLayoutState {
  rows: FeaturedLayoutRow[];
  loading: boolean;
  error: string | null;
}

const initialState: FeaturedLayoutState = {
  rows: [],
  loading: false,
  error: null,
};

const featuredLayoutSlice = createSlice({
  name: 'featuredLayout',
  initialState,
  reducers: {
    resetLayout: (state) => {
      state.rows = [];
    },

    setLayout: (state, action: PayloadAction<FeaturedLayoutRow[]>) => {
      state.rows = action.payload;
    },

    addRow: (state) => {
      const newRow = {
        order: state.rows.length,
        blocks: [],
      };
      state.rows.push(newRow);
    },

    removeRow: (state, action: PayloadAction<number>) => {
      state.rows.splice(action.payload, 1);
      state.rows.forEach((row, i) => (row.order = i));
    },

    addBlockToRow: (
      state,
      action: PayloadAction<{ rowIndex: number; block: FeaturedBlock }>
    ) => {
      const { rowIndex, block } = action.payload;
      state.rows[rowIndex].blocks.push(block);
    },

    updateBlock: (
      state,
      action: PayloadAction<{
        rowIndex: number;
        blockIndex: number;
        updates: Partial<FeaturedBlock>;
      }>
    ) => {
      const { rowIndex, blockIndex, updates } = action.payload;
      const block = state.rows[rowIndex].blocks[blockIndex];
      state.rows[rowIndex].blocks[blockIndex] = { ...block, ...updates };
    },

    removeBlock: (
      state,
      action: PayloadAction<{ rowIndex: number; blockIndex: number }>
    ) => {
      const { rowIndex, blockIndex } = action.payload;
      state.rows[rowIndex].blocks.splice(blockIndex, 1);
    },
  },
});

export const {
  resetLayout,
  setLayout,
  addRow,
  removeRow,
  addBlockToRow,
  updateBlock,
  removeBlock,
} = featuredLayoutSlice.actions;

export default featuredLayoutSlice.reducer;