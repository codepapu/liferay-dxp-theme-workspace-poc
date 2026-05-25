package com.myportal.product.menu.override.internal;

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
 * Loads shadcn v4 product-menu overrides after Liferay's product-menu CSS.
 */
// Disabled: styles merged into my-portal-shadcn-global/css/portal_shadcn_bundle.css
// @Component(
// 	property = "service.ranking:Integer=26000",
// 	service = DynamicInclude.class
// )
public class ProductMenuOverrideTopHeadDynamicInclude implements DynamicInclude {

	@Override
	public void include(
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse, String key)
		throws IOException {

		ThemeDisplay themeDisplay =
			(ThemeDisplay)httpServletRequest.getAttribute(
				WebKeys.THEME_DISPLAY);

		PrintWriter printWriter = httpServletResponse.getWriter();

		String cssURL =
			themeDisplay.getCDNBaseURL() +
				"/o/my-portal-product-menu-override/css/product_menu_override.css";

		printWriter.print("<link data-senna-track=\"permanent\" href=\"");
		printWriter.print(cssURL);
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
