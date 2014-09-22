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
					<ul class="threads-list">
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
					<!--<ul class="messages-list">
						<li>
							<div class="picture"></div>
							<div class="text">
								<div class="name">Ralph Wiggum</div>
								<div class="message">Insy Winsy spider went up the water spout down came the rain and washed the spider out</div>
								<div class="date">Sep 20 9:44PM</div>
							</div>
						</li>
						<li class="right">
							<div class="picture"></div>
							<div class="text">
								<div class="name">Moonshine Patio Bar & Grill</div>
								<div class="message">Out came the sunshine and dried up all the rain so insy winsy spider went up the sporut again</div>
								<div class="date">Sep 20 9:44PM</div>
							</div>
						</li>
					</ul>-->
				{{/if_not_eq}}
			</div>
		</div>
	</div>
</div>