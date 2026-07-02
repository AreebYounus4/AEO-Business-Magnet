import Image from "next/image";
import Link from "next/link";

export function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-wrap">
        <div className="not-found-content">
          <Image
            src="/images/404-hero.png"
            alt=""
            width={329}
            height={125}
            className="not-found-hero"
            priority
          />
          <h1 className="not-found-heading">Page Not Found</h1>
          <p className="not-found-copy">
            We&apos;re Sorry, the page you requested could be not found
            <br className="not-found-br" />
            Please god back to the home page here.
          </p>
        </div>
        <Link href="/" className="not-found-button">
          BACK&nbsp;TO&nbsp;HOME
        </Link>
      </div>
    </div>
  );
}
