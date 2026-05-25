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

/**
 * Theme script at bottom (toolbar toggle); un-hides legacy mp-shell-loading state.
 */
@Component(
	property = "service.ranking:Integer=100",
	service = DynamicInclude.class
)
public class ShadcnGlobalBottomDynamicInclude implements DynamicInclude {

	@Override
	public void include(
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse, String key)
		throws IOException {

		ThemeDisplay themeDisplay =
			(ThemeDisplay)httpServletRequest.getAttribute(
				WebKeys.THEME_DISPLAY);

		PrintWriter printWriter = httpServletResponse.getWriter();
		String nonce = ContentSecurityPolicyNonceProviderUtil.getNonce(
			httpServletRequest);

		/* Safety: undo any hidden-body state from older deployed CSS */
		printWriter.print("<script");
		printWriter.print(nonce);
		printWriter.println(">document.documentElement.classList.remove('mp-shell-loading');document.documentElement.classList.add('mp-shell-ready');</script>");

		printWriter.print("<script");
		printWriter.print(nonce);
		printWriter.print(" src=\"");
		printWriter.print(
			themeDisplay.getCDNBaseURL() +
				"/o/my-portal-shadcn-global/js/shadcn-theme-toggle.js");
		printWriter.println("\"></script>");
	}

	@Override
	public void register(DynamicIncludeRegistry dynamicIncludeRegistry) {
		dynamicIncludeRegistry.register(
			"/html/common/themes/bottom.jsp#post");
	}

}
