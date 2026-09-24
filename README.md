# pile-demo

A tiny checkout page used to prove the **Pile agent loop** end-to-end —
no human in the loop between the bug report and the fix PR:

```
customer records bug → support ticket (with artifacts)
    → issue dispatched to a coding agent
    → agent fetches capture artifacts (debugger.json, console, network)
    → agent root-causes, fixes, tests
    → PR opened → merged
```

## The two runs

### Run 1 — `cart.js` (PR [#1](https://github.com/VortexNYC/pile-demo/pull/1))

- **Bug**: `cartTotal` used `total += p` on string prices → `"10.0020.00"`,
  then `total.toFixed(2)` threw `TypeError: total.toFixed is not a function`.
- **Capture**: ticket `5a3cfba8` carried `debugger.json` (stack + locals),
  `console.log`, `network.jsonl` — real R2 artifacts uploaded through the
  public capture pipeline.
- **Agent fix**: `total += Number(p)` — one line. `cart.test.mjs` passes.

### Run 2 — `promo.js` (PR [#2](https://github.com/VortexNYC/pile-demo/pull/2))

- **Bug**: `applyPromo(total, "WELCOME10")` compared `code === "welcome10"`
  case-sensitively → returned `null` → `.toFixed` on null crashed checkout.
- **Agent transcript** shows it literally ran:
  `curl $PILE_API_URL/workspaces/<org>/support/tickets/<id>/artifacts -H "Authorization: Bearer $PILE_API_KEY"`,
  read `debugger.json` locals `{code: "WELCOME10"}`, and fixed with
  `String(code).toLowerCase() === "welcome10"`. `promo.test.mjs` passes.
- The agent correctly scoped a *different* pre-existing bug as out of scope.

## The pieces

| Piece | What |
|---|---|
| Capture link | A zero-install `capl_` link a customer/agent opens to record |
| Artifacts | `debugger.json` (stack + locals), console, network, replay — stored in R2, scrubbed of credentials server-side |
| Agent | Cursor (`cursor-grok-4.6-medium`) in a Cloudflare sandbox, given a scoped read-only Pile API key minted per session |
| Result | This repo's two merged PRs — written, tested, and opened unattended |

Run `node cart.test.mjs && node promo.test.mjs` — everything is green on `main`.
