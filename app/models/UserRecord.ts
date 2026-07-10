import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITaskItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface IRoadmapSection {
  id: number;
  heading: string;
  tasks: ITaskItem[];
}

export interface ITask {
  id: number;
  title: string;
  completed: boolean;
  slug?: string;
}

export interface ITaskCompletionRecord {
  key: string;
  taskId: number;
  taskTitle: string;
  roadmapSlug?: string;
  roadmapTitle?: string;
  sectionHeading?: string;
  completedAt: string;
}

export interface IDailyTaskProgress {
  date: string;
  completedCount: number;
  totalTasks: number;
  records: ITaskCompletionRecord[];
  lastCompletedAt: string;
}

export interface IRoadmapCard {
  title: string;
  slug: string;
  items?: string[];
  description?: string;
}

export interface IUserRecord extends Document {
  username: string;
  password?: string;
  name: string;
  about: string;
  tasks: ITask[];
  roadmapCards: IRoadmapCard[];
  roadmapCardTasks: Record<string, { tasks: ITaskItem[]; sections?: IRoadmapSection[] }>;
  taskCompletionHistory: Record<string, IDailyTaskProgress>;
}

const TaskItemSchema = new Schema<ITaskItem>({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const RoadmapSectionSchema = new Schema<IRoadmapSection>({
  id: { type: Number, required: true },
  heading: { type: String, required: true },
  tasks: { type: [TaskItemSchema], default: [] }
});

const TaskSchema = new Schema<ITask>({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  slug: { type: String }
});

const RoadmapCardSchema = new Schema<IRoadmapCard>({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  items: { type: [String] },
  description: { type: String }
});

const UserRecordSchema = new Schema<IUserRecord>({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, default: "" },
  name: { type: String, default: "Suraj Kumar" },
  about: { type: String, default: "" },
  tasks: { type: [TaskSchema], default: [] },
  roadmapCards: { type: [RoadmapCardSchema], default: [] },
  roadmapCardTasks: {
    type: Map,
    of: new Schema({
      tasks: { type: [TaskItemSchema], default: [] },
      sections: { type: [RoadmapSectionSchema], default: [] }
    }),
    default: {}
  },
  taskCompletionHistory: {
    type: Map,
    of: new Schema({
      date: { type: String, required: true },
      completedCount: { type: Number, default: 0 },
      totalTasks: { type: Number, default: 0 },
      records: {
        type: [{
          key: { type: String, required: true },
          taskId: { type: Number, required: true },
          taskTitle: { type: String, required: true },
          roadmapSlug: { type: String },
          roadmapTitle: { type: String },
          sectionHeading: { type: String },
          completedAt: { type: String, required: true }
        }],
        default: []
      },
      lastCompletedAt: { type: String, default: "" }
    }),
    default: {}
  }
}, { timestamps: true });

const UserRecord: Model<IUserRecord> = mongoose.models.UserRecord || mongoose.model<IUserRecord>("UserRecord", UserRecordSchema);

export default UserRecord;
