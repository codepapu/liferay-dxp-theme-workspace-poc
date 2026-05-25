package com.myportal.theme.deployer.internal;

import com.liferay.portal.instance.lifecycle.BasePortalInstanceLifecycleListener;
import com.liferay.portal.instance.lifecycle.PortalInstanceLifecycleListener;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.model.Company;
import com.liferay.portal.kernel.model.Group;
import com.liferay.portal.kernel.model.GroupConstants;
import com.liferay.portal.kernel.model.LayoutSet;
import com.liferay.portal.kernel.service.CompanyLocalService;
import com.liferay.portal.kernel.service.GroupLocalService;
import com.liferay.portal.kernel.service.LayoutSetLocalService;

import java.util.List;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * Applies {@value #THEME_ID} to all site layout sets — no Look & Feel UI step.
 */
@Component(service = PortalInstanceLifecycleListener.class)
public class MyPortalThemeDeployerPortalInstanceLifecycleListener
	extends BasePortalInstanceLifecycleListener {

	/**
	 * Set to {@code myportaltheme} after {@code :modules:my-portal-theme:deploy} succeeds.
	 * Until the WAR theme builds, {@code dialect} applies shadcn modules on top of Dialect.
	 */
	public static final String THEME_ID = "dialect";

	@Activate
	protected void activate() {
		try {
			for (Company company : _companyLocalService.getCompanies()) {
				_applyThemeToCompany(company.getCompanyId());
			}
		}
		catch (Exception exception) {
			_log.error("Unable to apply theme on module activation", exception);
		}
	}

	@Override
	public void portalInstanceRegistered(Company company) throws Exception {
		_applyThemeToCompany(company.getCompanyId());
	}

	private void _applyThemeToCompany(long companyId) throws PortalException {
		List<Group> groups = _groupLocalService.getGroups(
			companyId, GroupConstants.ANY_PARENT_GROUP_ID, true);

		for (Group group : groups) {
			if (!group.isSite() || group.isStagingGroup() || !group.isActive()) {
				continue;
			}

			_updateLayoutSet(
				_layoutSetLocalService.fetchLayoutSet(group.getGroupId(), false));
			_updateLayoutSet(
				_layoutSetLocalService.fetchLayoutSet(group.getGroupId(), true));
		}

		if (_log.isInfoEnabled()) {
			_log.info(
				"Applied theme " + THEME_ID + " to site layout sets for company " +
					companyId);
		}
	}

	private void _updateLayoutSet(LayoutSet layoutSet) throws PortalException {
		if (layoutSet == null) {
			return;
		}

		if (THEME_ID.equals(layoutSet.getThemeId())) {
			return;
		}

		layoutSet.setThemeId(THEME_ID);

		_layoutSetLocalService.updateLayoutSet(layoutSet);
	}

	private static final Log _log = LogFactoryUtil.getLog(
		MyPortalThemeDeployerPortalInstanceLifecycleListener.class);

	@Reference
	private CompanyLocalService _companyLocalService;

	@Reference
	private GroupLocalService _groupLocalService;

	@Reference
	private LayoutSetLocalService _layoutSetLocalService;

}
