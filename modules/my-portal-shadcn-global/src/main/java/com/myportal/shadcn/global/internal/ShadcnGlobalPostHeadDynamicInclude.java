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
 * Single bundled stylesheet — loads after Liferay CSS, one repaint only.
 */
@Component(
	property = "service.ranking:Integer=30000",
	service = DynamicInclude.class
)
public class ShadcnGlobalPostHeadDynamicInclude implements DynamicInclude {

	@Override
	public void include(
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse, String key)
		throws IOException {

		ThemeDisplay themeDisplay =
			(ThemeDisplay)httpServletRequest.getAttribute(
				WebKeys.THEME_DISPLAY);

		String bundleURL =
			themeDisplay.getCDNBaseURL() +
				"/o/my-portal-shadcn-global/css/portal_shadcn_bundle.css";

		PrintWriter printWriter = httpServletResponse.getWriter();

		printWriter.print("<link rel=\"preload\" as=\"style\" href=\"");
		printWriter.print(bundleURL);
		printWriter.println("\" />");

		printWriter.print("<link data-senna-track=\"permanent\" href=\"");
		printWriter.print(bundleURL);
		printWriter.print("\"");
		printWriter.print(
			ContentSecurityPolicyNonceProviderUtil.getNonceAttribute(
				httpServletRequest));
		printWriter.println(" rel=\"stylesheet\" type=\"text/css\" />");
	}

	@Override
	public void register(DynamicIncludeRegistry dynamicIncludeRegistry) {
		dynamicIncludeRegistry.register(
			"/html/common/themes/top_head.jsp#post");
	}

}
