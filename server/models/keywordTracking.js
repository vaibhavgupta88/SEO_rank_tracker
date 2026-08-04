import mongoose from "mongoose";

// Subschema for historical ranking data over time
const rankEntrySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    position: {
        type: Number,
        default: null
    },
    page: {
        type: Number,
        default: null
    },
    title: {
        type: String,
        default: ""
    },
    snippet: {
        type: String,
        default: ""
    },
}, { _id: false }); // Prevents database bloat from subdocument IDs

// Subschema for capturing the top competitors in the SERPs during the last check
const competitorSchema = new mongoose.Schema({
    position: {
        type: Number,
        required: true  
    },
    url: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ""
    },
    snippet: {
        type: String,
        default: ""
    },
}, { _id: false }); // Prevents database bloat from subdocument IDs

const keywordTrackingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    keyword: {
        type: String,
        required: true,
        trim: true,
        lowercase: true // Good choice: normalizes inputs like "SEO" and "seo"
    },
    url: {
        type: String,
        required: true, 
        trim: true
    },
    domain: {
        type: String,
        required: true
    },
    currentPosition: {
        type: Number,
        default: null
    },
    currentPage: {
        type: Number,
        default: null
    },
    bestPosition: {
        type: Number,
        default: null
    },
    positionChange: {
        type: Number,
        default: 0
    },
    rankHistory: [rankEntrySchema],
    competitors: [competitorSchema],
    active: { 
        type: Boolean, 
        default: true 
    },
    lastChecked: { 
        type: Date, 
        default: null 
    },
    status: { 
        type: String, 
        enum: ['pending', 'checking', 'completed', 'failed'], 
        default: 'pending' 
    },
}, { timestamps: true });

// Prevents a user from adding the exact same keyword/domain combination twice
keywordTrackingSchema.index({ userId: 1, keyword: 1, domain: 1 }, { unique: true });

// Optimizes background worker queries picking up jobs to run
keywordTrackingSchema.index({ active: 1, status: 1 });

const KeywordTracking = mongoose.model("KeywordTracking", keywordTrackingSchema);
export default KeywordTracking;