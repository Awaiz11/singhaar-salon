import { ALL_THREE, INCLUDES, PACKAGES, PHOTOS, img } from "./data";

export default function Bridal() {
  return (
    <section id="bridal" className="bridal section" aria-labelledby="bridal-title">
      <div className="wrap">
        <div className="bridal__top">
          <div>
            <h2 id="bridal-title" className="h2">Bridal packages</h2>
            <p className="bridal__lede">
              One artist stays with you for all three days, so your look grows from mehndi to
              walima instead of starting over. Book four to six weeks ahead in wedding season.
            </p>
          </div>
          <figure className="bridal__photo">
            <img src={img(PHOTOS.mehndiBride, 700)} alt="Bride smiling at her mehndi, wearing red and gold" loading="lazy" />
          </figure>
        </div>

        <div className="compare" role="region" aria-label="What each package includes" tabIndex={0}>
          <table>
            <caption className="sr-only">Bridal packages compared</caption>
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">Included</span></th>
                {PACKAGES.map((p) => (
                  <th scope="col" key={p.key}>
                    <span className="compare__name">{p.name}</span>
                    <span className="compare__price">Rs {p.price}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INCLUDES.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {PACKAGES.map((p) => {
                    const yes = row.in === "all" || row.in.includes(p.key);
                    return (
                      <td key={p.key}>
                        {yes ? (
                          <span className="tick" role="img" aria-label="Included" />
                        ) : (
                          <span className="dash" aria-label="Not included">–</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <th scope="row">At home or at the venue</th>
                {PACKAGES.map((p) => (
                  <td key={p.key} className="compare__extra">+ Rs 10,000</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="compare-cards">
          {PACKAGES.map((p) => (
            <div key={p.key} className="pkg">
              <p className="pkg__head">
                <span className="compare__name">{p.name}</span>
                <span className="compare__price">Rs {p.price}</span>
              </p>
              <ul>
                {INCLUDES.filter((r) => r.in === "all" || r.in.includes(p.key)).map((r) => (
                  <li key={r.label}>{r.label}</li>
                ))}
              </ul>
              <p className="pkg__extra">At home or at the venue: + Rs 10,000</p>
            </div>
          ))}
        </div>

        <div className="bundle">
          <p>
            <strong>All three days for Rs {ALL_THREE.price}.</strong> That saves Rs {ALL_THREE.saves}{" "}
            and includes the barat trial.
          </p>
          <a href="#book" className="btn btn--gold">Ask about your dates</a>
        </div>
      </div>
    </section>
  );
}
