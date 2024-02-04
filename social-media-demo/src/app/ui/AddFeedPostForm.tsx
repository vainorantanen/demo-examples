import { addFeedPost } from "../lib/actions";

export default function AddFeedPostForm() {

    return (
        <form action={addFeedPost}>
                <label
        htmlFor="description"
        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
        >
        Description
        </label>
        <textarea
        id="description"
        name="description"
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        placeholder="Add text here"
        required
        />
        <button
        type="submit"
        >
            Publish
        </button>
        </form>
    )
}