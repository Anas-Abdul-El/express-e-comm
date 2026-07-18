interface UploadFile {
    file: Buffer;
    contentType: string;
    folder: string;
}
declare const uploadFile: ({ file, contentType, folder }: UploadFile) => Promise<string | undefined>;
export default uploadFile;
//# sourceMappingURL=supabase.d.ts.map