import Nav from '../../components/Nav'
import UpdatedAt from '../../components/UpdatedAt'
import { now } from '../../lib/currently'

const WIP = true

export default function NowPage() {
  const updatedAt = process.env.CURRENTLY_UPDATED_AT
  const [current, ...archive] = now

  return (
    <div className="page-enter">
      <Nav />
      <main className="now-main">

        {WIP ? (
          <p className="now-wip">work in progress</p>
        ) : (
          <>
            <div className="now-header">
              <h1 className="now-heading">Now</h1>
              <UpdatedAt timestamp={updatedAt} />
            </div>

            {/* Current entry */}
            <div className="now-entry">
              <span className="now-archive-date">{current.date}</span>
              <p className="now-body">{current.body}</p>
            </div>

            {/* Archive — only shows once there are past entries */}
            {archive.length > 0 && (
              <div className="now-archive">
                <h2 className="now-archive-heading">Archive</h2>
                {archive.map((entry, i) => (
                  <div key={i} className="now-archive-entry">
                    <span className="now-archive-date">{entry.date}</span>
                    <p className="now-archive-body">{entry.body}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </main>
    </div>
  )
}
