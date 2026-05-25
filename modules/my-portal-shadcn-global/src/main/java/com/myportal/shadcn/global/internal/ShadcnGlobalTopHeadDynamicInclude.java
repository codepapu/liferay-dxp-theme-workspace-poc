package com.myportal.shadcn.global.internal;

import com.liferay.portal.kernel.content.security.policy.ContentSecurityPolicyNonceProviderUtil;
import com.liferay.portal.kernel.servlet.taglib.DynamicInclude;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.WebKeys;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * Blocking theme + inline critical CSS (no flicker on first paint).
 */
@Component(
	property = "service.ranking:Integer=50",
	service = DynamicInclude.class
)
public class ShadcnGlobalTopHeadDynamicInclude implements DynamicInclude {

	@Override
	public void include(
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse, String key)
		throws IOException {

		PrintWriter printWriter = httpServletResponse.getWriter();
		String nonce = ContentSecurityPolicyNonceProviderUtil.getNonce(
			httpServletRequest);

		/* Theme before first paint — never hide body (causes blank page) */
		printWriter.print("<script");
		printWriter.print(nonce);
		printWriter.println(">(function(){var r=document.documentElement;var t;try{t=localStorage.getItem('my-portal-shadcn-theme');}catch(e){}if(!t&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){t='dark';}if(t==='dark'){r.classList.add('dark');r.setAttribute('data-theme','dark');}else{r.setAttribute('data-theme','light');}})();</script>");

		/* 2) Inline tokens — no HTTP request */
		printWriter.println("<style id=\"my-portal-critical-css\">");
		printWriter.println(_shadcnCriticalCSS.getCriticalCSS());
		printWriter.println("</style>");

		/* Emergency unhide if cached CSS still has mp-shell-loading */
		printWriter.print("<script");
		printWriter.print(nonce);
		printWriter.println(">document.documentElement.classList.remove('mp-shell-loading');document.documentElement.style.opacity='1';document.body&&(document.body.style.opacity='1');</script>");
	}

	@Override
	public void register(DynamicIncludeRegistry dynamicIncludeRegistry) {
		dynamicIncludeRegistry.register(
			"/html/common/themes/top_head.jsp#pre");
	}

	@Reference
	private ShadcnCriticalCSS _shadcnCriticalCSS;

}
