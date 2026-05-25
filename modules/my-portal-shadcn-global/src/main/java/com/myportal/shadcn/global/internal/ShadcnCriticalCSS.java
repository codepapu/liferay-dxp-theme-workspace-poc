package com.myportal.shadcn.global.internal;

import com.liferay.petra.string.StringPool;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;

/**
 * Caches critical CSS for inline &lt;style&gt; injection (zero network latency).
 */
@Component(service = ShadcnCriticalCSS.class)
public class ShadcnCriticalCSS {

	public String getCriticalCSS() {
		return _criticalCSS;
	}

	@Activate
	protected void activate() {
		_criticalCSS = _load("/META-INF/resources/css/critical-inline.css");
	}

	private String _load(String path) {
		try (InputStream inputStream = ShadcnCriticalCSS.class.getResourceAsStream(
				path)) {

			if (inputStream == null) {
				return StringPool.BLANK;
			}

			return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
		}
		catch (Exception exception) {
			return StringPool.BLANK;
		}
	}

	private String _criticalCSS;

}
