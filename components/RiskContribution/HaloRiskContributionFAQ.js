import React from 'react';

function HaloRiskContributionFAQ({ hostname }) {
    const [show1, setShow1] = React.useState(false);
    const [show2, setShow2] = React.useState(false);
    const [show3, setShow3] = React.useState(false);
    const [show4, setShow4] = React.useState(false);

    return (
        <div className="sectiondivide sectioncol ptsec">
            <h3 className="sec-head">Risk Contribution FAQ (Frequently Asked Questions)</h3>
            <div className="faqcon">
                <div className="faq">
                    <h4 onClick={() => setShow1(!show1)}>1. What is Adaptive’s Portfolio Risk Contribution tool?{show1 && <span className="minus">-</span>} {!show1 && <span>+</span>}</h4>
                    {show1 && <div className="content">
                        <p>Portfolio Risk Contribution ranks sources of a portfolio’s overall risk in the volatility of individual position holdings, helping you identify where risk is coming from. You may find some of the results surprising, especially when the portfolio includes riskier individual positions which are diversified (that is, they don’t tend to move together).</p>
                        <ul>
                            <li><b>Bars Show Risk Contribution of Position</b>. Each bar reflects how much of the overall portfolio’s volatility comes from a specific holding, which is a function in part of the weight of that holding in the portfolio. Bars for all portfolio positions should sum to 100%, though the total may be subject to rounding errors.
                                There are some nuances. Please contact us for more technical information—bars are computed using not only the weight of the stock in the portfolio and the implied volatility of the stock, but also an adjustment based on the correlation of such stock with the rest of the portfolio. This essentially calculates a “marginal” risk contribution for changes in the Portfolio Risk when adding an additional unit of said stock. Because of the correlation adjustments, a negatively correlated position will have a negative bar height signifying negative Risk Contribution—reducing the weight of a negatively correlated position, in other words will raise Portfolio Risk, and adding the weight of a negatively correlated position will reduce Portfolio Risk. The portfolio’s overall risk may be lower than individual components thanks to the benefits of diversification, which is a powerful allocation strategy for reducing risk. Read more about the finance use of ‘diversification’ at <a href="https://www.investopedia.com/terms/d/diversification.asp" target="_blank" className="ai-link">Investopedia</a> and <a href="https://en.wikipedia.org/wiki/Diversification_(finance)" target="_blank" className="ai-link">Wikipedia</a>.
                            </li>
                            <li><b>Dots Show Position Risk</b>. The dots show how ‘stable’ or ‘jittery’ an individual holding is, as measured by the holding’s annualized implied volatility (which is itself determined from the market prices for options on the underlying holding). Dots, in contrast to bars, are not affected by a position’s weight in the portfolio.</li>
                            <li><b>Horizontal Blue Line Shows Market Risk</b>. We currently use the VIX as our measure of market risk, though this may be refined further in the future. The VIX, often called the ‘fear index’ or ‘fear gauge’, is roughly a reading of the implied volatility of the S&P 500 for the coming 30 days, as calculated from the price of publicly traded options on the S&P 500. You can think of this line as the ‘position risk’ of the S&P 500, to compare whether individual positions are reading as more or less volatile than the market as a whole. Read more about ‘implied volatility’ and the VIX at <a href="https://en.wikipedia.org/wiki/VIX" target="_blank" className="ai-link">Wikipedia</a>, <a href="https://www.investopedia.com/terms/v/vix.asp" target="_blank" className="ai-link">Investopedia</a>, and the <a href="https://www.cboe.com/tradable_products/vix/" target="_blank" className="ai-link">Chicago Board Options Exchange</a>. Read more about the S&P 500 at <a href="https://en.wikipedia.org/wiki/S%26P_500" target="_blank" className="ai-link">Wikipedia</a>, <a href="https://www.investopedia.com/terms/s/sp500.asp" target="_blank" className="ai-link">Investopedia</a>, and <a href="https://www.spglobal.com/spdji/en/indices/equity/sp-500/#overview" target="_blank" className="ai-link">S&P Dow Jones Indices</a>.</li>
                        </ul>
                        <p><a href="https://adaptive-investments.com/requestdemo" target="_blank" className="ai-link">For added functionality, request a pilot account for our private beta of one-click downside protection</a>. Pilot users are able to save portfolios, securely link brokerage accounts for automatic updates of portfolio holdings and risk analysis, track market changes in the cost of downside protection, and more.</p>
                    </div>}
                </div>
                <div className="faq" id="faq2">
                    <h4 onClick={() => setShow2(!show2)}>2. Why is understanding individual risk contribution important?{show2 && <span className="minus">-</span>} {!show2 && <span>+</span>}</h4>
                    {show2 && <div className="content">
                        <p>Understanding your portfolio&apos;s top risk contributors helps manage portfolio risk. Possible insights include:</p>
                        <ul>
                            <li>Diversification. The portfolio’s overall risk may be lower than individual components thanks to the benefits of diversification, which is a powerful allocation strategy for reducing risk. Read more about the finance use of ‘diversification’ at <a href="https://www.investopedia.com/terms/d/diversification.asp" target="_blank" className="ai-link">Investopedia</a> and <a href="https://en.wikipedia.org/wiki/Diversification_(finance)" target="_blank" className="ai-link">Wikipedia</a>.</li>
                            <li>Position Risk and Position Size. Sometimes you will see that a more volatile position (higher dot) can contribute less to the overall portfolio risk (shorter bar) than a less volatile position which has a bigger weight in the portfolio. Volatile Tesla (TSLA), for example, may not be a big source of portfolio risk if it is relatively a small holding compared to a less volatile holding such as Pfizer (PFE).</li>
                            <li>Position Risk and Market Risk. Compare the implied volatility of individual positions (the dots) to see if they are above or below the market’s implied volatility.</li>
                        </ul>
                        <p>Risk tools such as Portfolio Risk Contribution and Adaptive one-click downside protection can help investors dial down portfolio specific risk and limit losses by changing the way we invest with downside protection.</p>
                        <p><a href="https://adaptive-investments.com/requestdemo" target="_blank" className="ai-link">For added functionality, request a pilot account for our private beta of one-click downside protection</a>. Pilot users are able to save portfolios, securely link brokerage accounts for automatic updates of portfolio holdings and risk analysis, track market changes in the cost of downside protection, and more.</p>
                    </div>}
                </div>
                <div className="faq" id="faq3">
                    <h4 onClick={() => setShow3(!show3)}>3. What are protective investment solutions? {show3 && <span className="minus">-</span>} {!show3 && <span>+</span>}</h4>
                    {show3 && <div className="content">
                        <p>Downside protection, often called a portfolio hedge, is a general term for investments and other agreements which pay off in market and portfolio declines. Common forms include ‘put options’ and futures contracts which require special expertise and trading permissions. </p>
                        <p>Downside protection can limit potential losses, thus reducing the overall risk of a portfolio even while staying invested for potential growth.</p>
                        <p>The cost of downside protection is a drag on a portfolio’s performance, compared to an unprotected portfolio. At the same time downside protection can sometimes lead to improved risk-adjusted returns as compared to buy-and-hold without protection, if protection proceeds are reinvested at lower prices in a portfolio which is growing over the long term. </p>
                    </div>}
                </div>
                <div className="faq" id="faq4">
                    <h4 onClick={() => setShow4(!show4)}>4. What is the relationship between Halo and Adaptive? {show4 && <span className="minus">-</span>} {!show4 && <span>+</span>}</h4>
                    {show4 && <div className="content">
                        <p>Adaptive is a Wealthtech Platform which offers risk analysis tools and portfolio downside protection to its clients. Halo utilizes Adaptive’s unique analytics to provide its clients with a view on risk inherent in their portfolios. </p>
                    </div>}
                </div>
            </div>
        </div>
    );
}
export default HaloRiskContributionFAQ;