export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white py-10">
      <div className="wrap flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-extrabold text-navy">Calibrate Commerce</div>
          <p className="text-sm text-text-muted">
            AI Search Optimization &amp; Discoverability
          </p>
        </div>
        <p className="text-sm text-text-muted">
          © {new Date().getFullYear()} Calibrate Commerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
