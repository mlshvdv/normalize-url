export interface Options {
	/**
	@default 'http:'

	Values: `'https:' | 'http:'`
	*/
	readonly defaultProtocol?: string; // TODO: Make this `'https:' | 'http:'` in the next major version.

	/**
	Prepends `defaultProtocol` to the URL if it's protocol-relative.

	@default true

	@example
	```
	normalizeUrl('//sindresorhus.com');
	//=> 'http://sindresorhus.com'

	normalizeUrl('//sindresorhus.com', {normalizeProtocol: false});
	//=> '//sindresorhus.com'
	```
	*/
	readonly normalizeProtocol?: boolean;

	/**
	Normalizes `https:` URLs to `http:`.

	@default false

	@example
	```
	normalizeUrl('https://sindresorhus.com');
	//=> 'https://sindresorhus.com'

	normalizeUrl('https://sindresorhus.com', {forceHttp: true});
	//=> 'http://sindresorhus.com'
	```
	*/
	readonly forceHttp?: boolean;

	/**
	Normalizes `http:` URLs to `https:`.

	This option can't be used with the `forceHttp` option at the same time.

	@default false

	@example
	```
	normalizeUrl('http://sindresorhus.com');
	//=> 'http://sindresorhus.com'

	normalizeUrl('http://sindresorhus.com', {forceHttps: true});
	//=> 'https://sindresorhus.com'
	```
	*/
	readonly forceHttps?: boolean;

	/**
	Strip the [authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) part of a URL.

	@default true

	@example
	```
	normalizeUrl('user:password@sindresorhus.com');
	//=> 'https://sindresorhus.com'

	normalizeUrl('user:password@sindresorhus.com', {stripAuthentication: false});
	//=> 'https://user:password@sindresorhus.com'
	```
	*/
	readonly stripAuthentication?: boolean;

	/**
	Removes hash from the URL.

	@default false

	@example
	```
	normalizeUrl('sindresorhus.com/about.html#contact');
	//=> 'http://sindresorhus.com/about.html#contact'

	normalizeUrl('sindresorhus.com/about.html#contact', {stripHash: true});
	//=> 'http://sindresorhus.com/about.html'
	```
	*/
	readonly stripHash?: boolean;

	/**
	Remove the protocol from the URL: `http://sindresorhus.com` → `sindresorhus.com`.

	It will only remove `https://` and `http://` protocols.

	@default false

	@example
	```
	normalizeUrl('https://sindresorhus.com');
	//=> 'https://sindresorhus.com'

	normalizeUrl('sindresorhus.com', {stripProtocol: true});
	//=> 'sindresorhus.com'
	```
	*/
	readonly stripProtocol?: boolean;

	/**
	Strip the [text fragment](https://web.dev/text-fragments/) part of the URL

	__Note:__ The text fragment will always be removed if the `stripHash` option is set to `true`, as the hash contains the text fragment.

	@default true

	@example
	```
	normalizeUrl('http://sindresorhus.com/about.html#:~:text=hello');
	//=> 'http://sindresorhus.com/about.html#'

	normalizeUrl('http://sindresorhus.com/about.html#section:~:text=hello');
	//=> 'http://sindresorhus.com/about.html#section'

	normalizeUrl('http://sindresorhus.com/about.html#:~:text=hello', {stripTextFragment: false});
	//=> 'http://sindresorhus.com/about.html#:~:text=hello'

	normalizeUrl('http://sindresorhus.com/about.html#section:~:text=hello', {stripTextFragment: false});
	//=> 'http://sindresorhus.com/about.html#section:~:text=hello'
	```
	*/
	readonly stripTextFragment?: boolean;

	/**
	Removes `www.` from the URL.

	@default true

	@example
	```
	normalizeUrl('http://www.sindresorhus.com');
	//=> 'http://sindresorhus.com'

	normalizeUrl('http://www.sindresorhus.com', {stripWWW: false});
	//=> 'http://www.sindresorhus.com'
	```
	*/
	readonly stripWWW?: boolean;

	/**
	Removes query parameters that matches any of the provided strings or regexes.

	@default [/^utm_\w+/i]

	@example
	```
	normalizeUrl('www.sindresorhus.com?foo=bar&ref=test_ref', {
		removeQueryParameters: ['ref']
	});
	//=> 'http://sindresorhus.com/?foo=bar'
	```

	If a boolean is provided, `true` will remove all the query parameters.

	```
	normalizeUrl('www.sindresorhus.com?foo=bar', {
		removeQueryParameters: true
	});
	//=> 'http://sindresorhus.com'
	```

	`false` will not remove any query parameter.

	```
	normalizeUrl('www.sindresorhus.com?foo=bar&utm_medium=test&ref=test_ref', {
		removeQueryParameters: false
	});
	//=> 'http://www.sindresorhus.com/?foo=bar&ref=test_ref&utm_medium=test'
	```
	*/
	readonly removeQueryParameters?: ReadonlyArray<RegExp | string> | boolean;

	/**
	Removes query parameters that matches specified value. May be helpful to make canonical URL.

	@default undefined

	@example
	```
	normalizeUrl('www.sindresorhus.com?foo=bar&page=1&page_size=30', {
		removeQueryParametersByValue: [
			{
				key: 'page',
				value: 1
			},
			{
				key: 'page_size',
				value: 10
			}
		]
	});
	//=> 'http://sindresorhus.com/?foo=bar&page_size=30'
	```
	*/
	readonly removeQueryParametersByValue?: ReadonlyArray<{key: string; value: string | number}> | undefined;

	/**
	Keeps only query parameters that matches any of the provided strings or regexes.

	__Note__: It overrides the `removeQueryParameters` option.

	@default undefined

	@example
	```
	normalizeUrl('https://sindresorhus.com?foo=bar&ref=unicorn', {
		keepQueryParameters: ['ref']
	});
	//=> 'https://sindresorhus.com/?ref=unicorn'
	```
	*/
	readonly keepQueryParameters?: ReadonlyArray<RegExp | string>;

	/**
	Removes trailing slash.

	__Note__: Trailing slash is always removed if the URL doesn't have a pathname unless the `removeSingleSlash` option is set to `false`.

	@default true

	@example
	```
	normalizeUrl('http://sindresorhus.com/redirect/');
	//=> 'http://sindresorhus.com/redirect'

	normalizeUrl('http://sindresorhus.com/redirect/', {removeTrailingSlash: false});
	//=> 'http://sindresorhus.com/redirect/'

	normalizeUrl('http://sindresorhus.com/', {removeTrailingSlash: false});
	//=> 'http://sindresorhus.com'
	```
	*/
	readonly removeTrailingSlash?: boolean;

	/**
	Remove a sole `/` pathname in the output. This option is independent of `removeTrailingSlash`.

	@default true

	@example
	```
	normalizeUrl('https://sindresorhus.com/');
	//=> 'https://sindresorhus.com'

	normalizeUrl('https://sindresorhus.com/', {removeSingleSlash: false});
	//=> 'https://sindresorhus.com/'
	```
	*/
	readonly removeSingleSlash?: boolean;

	/**
	Removes the default directory index file from path that matches any of the provided strings or regexes.
	When `true`, the regex `/^index\.[a-z]+$/` is used.

	@default false

	@example
	```
	normalizeUrl('www.sindresorhus.com/foo/default.php', {
		removeDirectoryIndex: [/^default\.[a-z]+$/]
	});
	//=> 'http://sindresorhus.com/foo'
	```
	*/
	readonly removeDirectoryIndex?: boolean | ReadonlyArray<RegExp | string>;

	/**
	Removes an explicit port number from the URL.

	Port 443 is always removed from HTTPS URLs and 80 is always removed from HTTP URLs regardless of this option.

	@default false

	@example
	```
	normalizeUrl('sindresorhus.com:123', {
		removeExplicitPort: true
	});
	//=> 'http://sindresorhus.com'
	```
	*/
	readonly removeExplicitPort?: boolean;

	/**
	Sorts the query parameters alphabetically by key.

	@default true

	@example
	```
	normalizeUrl('www.sindresorhus.com?b=two&a=one&c=three', {
		sortQueryParameters: false
	});
	//=> 'http://sindresorhus.com/?b=two&a=one&c=three'
	```
	*/
	readonly sortQueryParameters?: boolean;
}

/**
[Normalize](https://en.wikipedia.org/wiki/URL_normalization) a URL.

@param url - URL to normalize, including [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
@param options — options
@example
```
import normalizeUrl from 'normalize-url';

normalizeUrl('sindresorhus.com');
//=> 'http://sindresorhus.com'

normalizeUrl('//www.sindresorhus.com:80/../baz?b=bar&a=foo');
//=> 'http://sindresorhus.com/baz?a=foo&b=bar'
```
*/
export default function normalizeUrl(url: string, options?: Options): string;
