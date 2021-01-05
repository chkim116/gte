import cheerio from "cheerio";
import Axios from "axios";

export default async function getEmoji(req, res) {
    const { text } = req.body;
    try {
        let list = [];
        const emoji = await Axios.get(
            `https://emojipedia.org/search/?q=${text}`
        ).then((res) => res.data);
        const $ = cheerio.load(emoji);
        const $bodyList = $("ol.search-results").children("li");

        $bodyList.each(function (i) {
            list[i] = {
                emoji: $(this).find("a span").html(),
                id: i++,
            };
        });
        res.status(200).json(list);
    } catch (err) {
        console.log(err);
        res.status(400).json("영어로 입력해 주세요");
    }
}
