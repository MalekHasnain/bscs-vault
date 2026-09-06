/* eslint-disable @typescript-eslint/no-empty-object-type -- generated-style DB types */
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          is_admin: boolean;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          is_admin?: boolean;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          is_admin?: boolean;
          avatar_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      subjects: {
        Row: {
          id: string;
          code: string;
          title: string;
          semester: number;
          course_type: "required" | "elective" | "deficiency";
          credit_hours: number;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          title: string;
          semester?: number;
          course_type?: "required" | "elective" | "deficiency";
          credit_hours?: number;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          title?: string;
          semester?: number;
          course_type?: "required" | "elective" | "deficiency";
          credit_hours?: number;
          created_by?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      questions: {
        Row: {
          id: string;
          subject_id: string;
          q_type: "mcq" | "short" | "long";
          question_text: string;
          options: string[] | null;
          correct_option: number | null;
          answer_text: string | null;
          paper_type: "midterm" | "final" | "quiz" | "other";
          paper_year: number | null;
          status: "pending" | "approved" | "rejected";
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          subject_id: string;
          q_type: "mcq" | "short" | "long";
          question_text: string;
          options?: string[] | null;
          correct_option?: number | null;
          answer_text?: string | null;
          paper_type?: "midterm" | "final" | "quiz" | "other";
          paper_year?: number | null;
          status?: "pending" | "approved" | "rejected";
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          subject_id?: string;
          q_type?: "mcq" | "short" | "long";
          question_text?: string;
          options?: string[] | null;
          correct_option?: number | null;
          answer_text?: string | null;
          paper_type?: "midterm" | "final" | "quiz" | "other";
          paper_year?: number | null;
          status?: "pending" | "approved" | "rejected";
          created_by?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "questions_subject_id_fkey";
            columns: ["subject_id"];
            referencedRelation: "subjects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "questions_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      handouts: {
        Row: {
          id: string;
          subject_id: string;
          title: string;
          file_url: string;
          uploaded_by: string | null;
          status: "pending" | "approved" | "rejected";
          created_at: string;
        };
        Insert: {
          id?: string;
          subject_id: string;
          title: string;
          file_url: string;
          uploaded_by?: string | null;
          status?: "pending" | "approved" | "rejected";
          created_at?: string;
        };
        Update: {
          id?: string;
          subject_id?: string;
          title?: string;
          file_url?: string;
          uploaded_by?: string | null;
          status?: "pending" | "approved" | "rejected";
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "handouts_subject_id_fkey";
            columns: ["subject_id"];
            referencedRelation: "subjects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "handouts_uploaded_by_fkey";
            columns: ["uploaded_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          content: string;
          cover_image_url: string | null;
          tags: string[];
          meta_title: string | null;
          meta_description: string | null;
          status: "draft" | "published";
          published_at: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt?: string | null;
          content: string;
          cover_image_url?: string | null;
          tags?: string[];
          meta_title?: string | null;
          meta_description?: string | null;
          status?: "draft" | "published";
          published_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string | null;
          content?: string;
          cover_image_url?: string | null;
          tags?: string[];
          meta_title?: string | null;
          meta_description?: string | null;
          status?: "draft" | "published";
          published_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      // no views yet
    };
    Functions: {
      // is_admin(): boolean — used only inside RLS, not called from the client
    };
  };
};

export type Subject = Database["public"]["Tables"]["subjects"]["Row"];
export type Question = Database["public"]["Tables"]["questions"]["Row"];
export type Handout = Database["public"]["Tables"]["handouts"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Post = Database["public"]["Tables"]["posts"]["Row"];
