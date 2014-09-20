<div class="page-title">{{template.title}}</div>
<div class="messages-container">
	<div class="scrollable">
		<div class="head">
			<div class="search">
				<input id="search-messages-field" type="text" placeholder="Search messages"/>
				<div class="search-icon"></div>
			</div>
			<div class="thread-info"><span></span></div>
		</div>
		<div class="body">
			<div class="thread-list">
				{{#if_eq chatList.length 0}}
					<div class="blank-list">No Messages</div>
				{{else}}
					<ul class="messages-list">
						{{#each chatList}}
							{{#if_eq latestMessage.candidateSeen false}}
								<li class="new" id="{{id}}">
							{{else}}
								<li id="{{id}}">
							{{/if_eq}}
							<div class="picture">
								{{#if_not_null jobPosting.employer.logo}}
									<img src="{{jobPosting.employer.logo.url}}"/>
								{{/if_not_null}}
							</div>
							<div class="info">
								<div class="name">{{jobPosting.employer.name}}</div>
								{{#if_eq candidate.guid latestMessage.sender.guid}}
									<div class="message outgoing">{{latestMessage.chatMessageContent.text}}</div>
								{{else}}
									<div class="message incoming">{{latestMessage.chatMessageContent.text}}</div>
								{{/if_eq}}
							</div>
							</li>
						{{/each}}
					</ul>
				{{/if_eq}}
			</div>
			<div class="thread-view">
				{{#if_not_eq chatList.length 0}}
					<div class="blank-view">This blank message helps protect your privacy. Select a thread from the list to view messages.</div>
				{{/if_not_eq}}
			</div>
		</div>
	</div>
</div>