import { OpenScoreCheckButton } from "@/components/forms/ScoreCheckContext";
import { ArrowIcon } from "@/components/landing/icons";

export function BigQuestionSection() {
  return (
    <section className="big-q-sec sec-sm" aria-labelledby="bigq-h">
      <div className="wrap">
        <div className="big-q-box">
          <h2 className="big-q-text" id="bigq-h">
            When AI recommends solutions
            <br />
            in your category,
            <br />
            <span>does it recommend you?</span>
          </h2>
          <p className="big-q-sub">
            If not, your competitors may be winning consideration before a
            customer ever reaches your website. That&apos;s the opportunity, and
            the urgency.
          </p>
          <OpenScoreCheckButton className="btn btn-red btn-lg">
            Check Your Website Score Now
            <ArrowIcon />
          </OpenScoreCheckButton>
        </div>
      </div>
    </section>
  );
}
