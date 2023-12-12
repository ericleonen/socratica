import { Pipeline, pipeline } from "@xenova/transformers";

const xenovaModel = () => class XenovaLM {
    static task = "feature-extraction";
    static model = "Xenova/all-MiniLM-L6-v2";
    static instance: Pipeline | null = null;

    static async getInstance(progress_callback?: Function) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}
export default xenovaModel();